import Set "mo:core/Set";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";


// Apply migration in with-clause

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Subscription management
  let subscriptions = Set.empty<Text>();

  public shared ({ caller }) func submitSubscription(email : Text) : async Bool {
    let wasAdded = not subscriptions.contains(email);
    subscriptions.add(email);
    wasAdded;
  };

  public query ({ caller }) func getSubscriptionCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view subscription count");
    };
    subscriptions.size();
  };

  type NewPhoto = {
    id : Text;
    blob : Storage.ExternalBlob;
    caption : ?Text;
    uploadTime : Time.Time;
  };

  type NewPhotoId = Text;

  let photos = Map.empty<NewPhotoId, NewPhoto>();

  // Admin-only photo upload function
  public shared ({ caller }) func uploadPhoto(blob : Storage.ExternalBlob, caption : ?Text) : async NewPhotoId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload photos");
    };

    let timestamp = Time.now();
    let photoId = timestamp.toText();

    let photo : NewPhoto = {
      id = photoId;
      blob;
      caption;
      uploadTime = timestamp;
    };

    photos.add(photoId, photo);
    photoId;
  };

  // Retrieve all photos
  public query ({ caller }) func getAllPhotos() : async [NewPhoto] {
    photos.values().toArray();
  };

  // Delete photo (admin only)
  public shared ({ caller }) func deletePhoto(id : NewPhotoId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete photos");
    };

    switch (photos.get(id)) {
      case (null) { Runtime.trap("Photo not found") };
      case (?_) {
        photos.remove(id);
      };
    };
  };
};
