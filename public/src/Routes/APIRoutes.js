//set route for db
export const host = 'http://localhost:4000';

//set routes for all backend communcation
export const registerRoute = `${host}/api/auth/register/`;

export const loginRoute = `${host}/api/auth/login/`;

export const setIconRoute = `${host}/api/auth/seticon`;

export const allUsersRoute = `${host}/api/auth/allusers`;

export const sendMessageRoute = `${host}/api/messages/addmsg`;

export const getAllMessagesRoute = `${host}/api/messages/getmsg`;
