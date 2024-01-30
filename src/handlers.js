import db from "./db.js";
import {
  parseRequestBody,
  prepareHobbies,
  prepareUser,
  sendResponse,
} from "./utils.js";

export const postUserHandler = async (req, res) => {
  try {
    const body = await parseRequestBody(req);
    const user = db.addUser(body);

    if (!user) {
      sendResponse(res, 400, {
        data: null,
        error: "Something went wrong",
      });
      return;
    }

    const data = {
      data: prepareUser(user),
      error: null,
    };

    sendResponse(res, 201, data);
  } catch {
    sendResponse(res, 400, { data: null, error: "Something went wrong" });
  }
};

export const getUsersHandler = (req, res) => {
  try {
    const users = db.getUsers();

    const data = {
      data: users.map(prepareUser),
      error: null,
    };

    sendResponse(res, 200, data, {
      "Cache-Control": "public, max-age=3600",
    });
  } catch {
    sendResponse(res, 400, { data: null, error: "Something went wrong" });
  }
};

export const getUserHandler = (req, res) => {
  try {
    const userId = req.url.split("/")[3];
    const user = db.getUser(userId);

    if (!user) {
      sendResponse(res, 404, {
        data: null,
        error: `User with id ${userId} doesn't exist`,
      });
      return;
    }

    const data = {
      data: prepareUser(user),
      error: null,
    };

    sendResponse(res, 200, data, {
      "Cache-Control": "public, max-age=3600",
    });
  } catch {
    sendResponse(res, 400, { data: null, error: "Something went wrong" });
  }
};

export const deleteUserHandler = (req, res) => {
  try {
    const userId = req.url.split("/")[3];
    const success = db.deleteUser(userId);

    if (success) {
      sendResponse(res, 200, { data: { success: true }, error: null });
    } else {
      sendResponse(res, 404, {
        data: null,
        error: `User with id ${userId} doesn't exist`,
      });
    }
  } catch {
    sendResponse(res, 400, { data: null, error: "Something went wrong" });
  }
};

export const getHobbiesHandler = (req, res) => {
  try {
    const userId = req.url.split("/")[3];
    const user = db.getUser(userId);

    if (!user) {
      sendResponse(res, 404, {
        data: null,
        error: `User with id ${userId} doesn't exist`,
      });
      return;
    }

    const hobbies = db.getHobbies(userId);

    const data = {
      hobbies: prepareHobbies(userId, hobbies),
      error: null,
    };

    sendResponse(res, 200, data, {
      "Cache-Control": "private, max-age=3600",
    });
  } catch {
    sendResponse(res, 400, { data: null, error: "Something went wrong" });
  }
};

export const patchHobbiesHandler = async (req, res) => {
  try {
    const userId = req.url.split("/")[3];
    const user = db.getUser(userId);

    if (!user) {
      sendResponse(res, 404, {
        data: null,
        error: `User with id ${userId} doesn't exist`,
      });
      return;
    }

    const body = await parseRequestBody(req);
    const hobbies = db.addHobbies(userId, body?.hobbies);

    if (!hobbies) {
      sendResponse(res, 400, {
        data: null,
        error: "Something went wrong",
      });
      return;
    }

    const data = {
      data: prepareUser(user),
      error: null,
    };

    sendResponse(res, 200, data);
  } catch {
    sendResponse(res, 400, { data: null, error: "Something went wrong" });
  }
};

export const defaultHandler = (req, res) => {
  sendResponse(res, 400, { data: null, error: "Something went wrong" });
};
