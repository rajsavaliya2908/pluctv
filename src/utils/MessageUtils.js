const Errors = {

    mobileNoBlank: 'Mobile number is required',
    phoneInvalid: 'Phone number is invalid',
    phoneTooLong: 'Phone number  exceed limit',
    phoneTooShort: 'Phone number is too short',

    usernameBlank: 'Username is required',
    nameBlank: 'Name is required',
    passwordBlank: 'Please enter Password',
    emailBlank: 'Please enter Email',
    otpBlank: 'Please enter code',

    APIError:'Something went wrong!',

    titleBlank: 'Please enter Title',
    descriptionBlank: 'Please enter Description',
    locationBlank: 'Please enter Location',
    nameLength: 'Name characters exceed limit',
    nameInvalid: 'Name is invalid',
    emailValidity: 'Email is not valid',
    pwdBlank: 'Please enter Password',
    pwdOldBlank: 'Please enter Old Password',
    pwdInvalid: 'Please enter strong password. Ex: Abc@123',
    pwdLengthMinimum: 'Password must be atleast 6 characters',
    pwdMisMatch: 'Password not match',
    inviteCodeBlank: 'Please enter invite code',
    inviteCodeValid: 'Please Enter valide invite code',



};

const PermissionMessage = {
    cancel: 'Cancel',
    ok: 'ok',
    openSetting: 'Open Setting',
    authorized: 'authorized',
    denied: 'denied',
    restricted: 'restricted',
    granted: 'granted',
    never_ask_again: 'never_ask_again',
    in_development: 'In Development',
    cameraPermissionSetting: 'Please give camere permission from setting',
    photoPermissionSetting: 'Please give photo picker permission from setting',
    //Camera
    cameraPermissionTitle: 'Camera',
    cameraPermissionMessage:
        "We need access so you can take pic, please open this app's setting and allow camera access",

    //Photo
    photoPermissionTitle: 'Photo',
    photoPermissionMessage:
        "We need access so you can upload pic, please open this app's setting and allow photo access",

    //Location
    locationPermissionTitle: 'Location',
    locationPermissionMessage:
        "We need access so we can get your current location, please open this app's setting and allow location access.",

    //Notification
    notificationPermissionTitle: 'Notification',
    notificationPermissionMessage:
        "We need access so you can get notification, please open this app's setting and allow notification access.",

    //Storage
    storagePermissionTitle: 'Storage',
    storagePermissionMessage:
        "We need access so we can get your storage, please open this app's setting and allow storage access.",

    //Contacts
    contactPermissionTitle: 'Contact',
    contactPermissionMessage:
        "We need access so we can get your contacts, please open this app's setting and allow contacts access.",

    //Phone Call
    phoneCallPermissionTitle: 'PhoneCall',
    phoneCallPermissionMessage:
        "We need access so we can allow you to call, please open this app's setting and allow phone call access.",

    //Read Sms
    readSmsPermissionTitle: 'ReadSms',
    readSmsPermissionMessage:
        "We need access so we can get your sms, please open this app's setting and allow message access.",
};

export default {Errors, PermissionMessage};
