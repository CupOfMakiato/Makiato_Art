import apiClient from "./base-url";

const API_KEY = import.meta.env.VITE_APIKEY;
const API_TOKEN = import.meta.env.VITE_TOKEN;
const BOARD_ID = import.meta.env.VITE_BOARDID;

// common params for all requests
const authParams = {
  key: API_KEY,
  token: API_TOKEN,
};
// GET /boards/{boardId}
export const viewBoardById = async () => {
  try {
    const response = await apiClient.get(`/boards/${BOARD_ID}`, {
      params: authParams,
      headers: { Accept: 'application/json' },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching board by id:', error.message);
    throw error;
  }
};

// GET /boards/{boardId}/lists
export const viewAllListsByBoardId = async () => {
  try {
    const response = await apiClient.get(`/boards/${BOARD_ID}/lists`, {
      params: authParams,
      headers: { Accept: 'application/json' },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching lists by board id:', error.message);
    throw error;
  }
};

// GET /boards/{boardId}/cards
export const viewAllCardsByBoardId = async () => {
  try {
    const response = await apiClient.get(`/boards/${BOARD_ID}/cards`, {
      params: authParams,
      headers: { Accept: 'application/json' },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching cards by board id:', error.message);
    throw error;
  }
};
// GET /lists/{listId}
export const viewListById = async (listId) => {
  try {
    const response = await apiClient.get(`/lists/${listId}`, {
      params: authParams,
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching list by id:", error.message);
    throw error;
  }
};

// GET /lists/{listId}/cards
export const viewAllCardsByListId = async (listId) => {
  try {
    const response = await apiClient.get(`/lists/${listId}/cards`, {
      params: authParams,
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cards by list id:", error.message);
    throw error;
  }
};

// GET /cards/{cardId}
export const viewCardById = async (cardId) => {
  try {
    const response = await apiClient.get(`/cards/${cardId}`, {
      params: authParams,
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching card by id:", error.message);
    throw error;
  }
};

// GET /cards/{cardId}/attachments
export const viewCardAttachments = async (cardId) => {
  try {
    const response = await apiClient.get(`/cards/${cardId}/attachments`, {
      params: authParams,
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching card attachments:", error.message);
    throw error;
  }
};

// GET /cards/{cardId}/attachments/{idAttachment}
export const viewCardAttachmentById = async (cardId, attachmentId) => {
  try {
    const response = await apiClient.get(
      `/cards/${cardId}/attachments/${attachmentId}`,
      {
        params: authParams,
        headers: { Accept: "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching attachment by id:", error.message);
    throw error;
  }
};
