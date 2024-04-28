import { DEPLOYED_API_BASE_URL } from "./apiConfig";

////////////////////////////////////////////////////////////////////////
/****************************  AUTH CALLS  ****************************/
////////////////////////////////////////////////////////////////////////

// REFRESH TOKEN

export const refreshToken = async (errorCallback?: (error: any) => void) => {
  if (localStorage.refresh_token) {
    const url = DEPLOYED_API_BASE_URL + "token/refresh/";

    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: localStorage.refresh_token }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("access_token", data.access);
        })
        .catch((error) => {
          errorCallback && errorCallback(error);
        });
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  }
};

////////////////////////////////////////////////////////////////////////
/******************************  PUT CALLS  ***************************/
////////////////////////////////////////////////////////////////////////

/* PUT NEW STAGE ORDER PROJECT*/

export const putNewOrderDeal = async (
  stageId: number,
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}deal-stages/${stageId}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* PUT NEW STAGE ORDER PROJECT*/

export const putNewOrderProject = async (
  stageId: number,
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}project-stages/${stageId}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* PUT NEW STAGE ORDER CAMPAIGN*/

export const putNewOrderCampaign = async (
  stageId: number,
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}campaign-stages/${stageId}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* PUT PROJECT*/

export const putProject = async (
  projectId: number,
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}projects/${projectId}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* PUT CAMPAIGN */

export const putCampaign = async (
  campaignId: number,
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}campaigns/${campaignId}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* PUT DEAL */

export const putDeal = async (
  dealId: string,
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}deals/${dealId}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* PUT BRAND */

export const putBrand = async (
  brandId: string,
  updatedData: FormData,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}brands/${brandId}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: updatedData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* PUT CREATOR */

export const putCreator = async (
  creatorId: string,
  updatedData: FormData,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}creators/${creatorId}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: updatedData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* PUT USER PROFILE */

export const putUserProfile = async (
  userId: string,
  updatedData: FormData,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}users/${userId}/`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: updatedData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

////////////////////////////////////////////////////////////////////////
/***************************  CHANGE CALLS  ***************************/
////////////////////////////////////////////////////////////////////////

/* CHANGE PROJECT-STAGE NAME ------------------>   ES IDENTICO A putNewOrderProject */

// export const changeProjectStageName = async (
//   projectId: number,
//   updatedData: any,
//   callback: (data: any) => void,
//   errorCallback?: (error: any) => void
// ) => {
//   const url = `${DEPLOYED_API_BASE_URL}project-stages/${projectId}/`;

//   try {
//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.access_token}`,
//       },
//       body: JSON.stringify(updatedData),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     callback(data);
//   } catch (error) {
//     errorCallback && errorCallback(error);
//   }
// };

////////////////////////////////////////////////////////////////////////
/***************************  DELETE CALLS  ***************************/
////////////////////////////////////////////////////////////////////////

/* DELETE PROJECT */

export const deleteProject = async (
  projectId: number,
  callback: () => void, // No data parameter
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}projects/${projectId}/`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    callback(); // Call callback directly without data
  } catch (error) {
    errorCallback(error);
  }
};

/* DELETE PROJECT-STAGE */

export const deleteProjectStage = async (
  stageId: number,
  callback: () => void,
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}project-stages/${stageId}/`; // Adjusted endpoint to 'project-stages'

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    callback();
  } catch (error) {
    errorCallback(error);
  }
};

/* DELETE CAMPAGIN */

export const deleteCampaign = async (
  campaignId: number,
  callback: () => void,
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}campaigns/${campaignId}/`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    callback();
  } catch (error) {
    errorCallback(error);
  }
};

/* DELETE CAMPAIGN-STAGE */

export const deleteCampaignStage = async (
  stageId: number,
  callback: () => void,
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}campaign-stages/${stageId}/`; // Adjusted endpoint to 'project-stages'

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    callback();
  } catch (error) {
    errorCallback(error);
  }
};

/* DELETE DEAL */

export const deleteDeal = async (
  dealId: number,
  callback: () => void,
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}deals/${dealId}/`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    callback();
  } catch (error) {
    errorCallback(error);
  }
};

/* DELETE DEAL-STAGE */

export const deleteDealStage = async (
  stageId: number,
  callback: () => void,
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}deal-stages/${stageId}/`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    callback();
  } catch (error) {
    errorCallback(error);
  }
};

/* DELETE CREATOR */

export const deleteCreator = async (
  creatorId: number,
  callback: () => void, // No data parameter
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}creators/${creatorId}/`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    callback(); // Call callback directly without data
  } catch (error) {
    errorCallback(error);
  }
};

/* DELETE BRAND */

export const deleteBrand = async (
  brandId: number,
  callback: () => void, // No data parameter
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}brands/${brandId}/`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    callback(); // Call callback directly without data
  } catch (error) {
    errorCallback(error);
  }
};

////////////////////////////////////////////////////////////////////////
/******************************  POST CALLS  ***************************/
////////////////////////////////////////////////////////////////////////

/* POST TICKET*/

// export const postTicket = async (
//   requestData: any,
//   callback: (data: any) => void,
//   errorCallback?: (error: any) => void
// ) => {
//   const url = DEPLOYED_API_BASE_URL + 'tickets/';

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         // 'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.access_token}`,
//       },
//       body: JSON.stringify(requestData),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     callback(data);
//   } catch (error) {
//     errorCallback && errorCallback(error);
//   }
// };

/* POST TICKET */

export const postTicket = async (
  requestData: FormData, // Assuming requestData is a FormData object for file handling
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "tickets/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // 'Content-Type': 'multipart/form-data' is not set because browsers will automatically set it correctly along with the boundary when using FormData
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: requestData, // Directly using FormData here
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST PROJECT */

export const postProjects = async (
  requestData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "projects/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST DEAL-STAGE */

export const postDealStage = async (
  requestData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "deal-stages/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST CAMPAIGN-STAGE */

export const postCampaignStage = async (
  requestData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "campaign-stages/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST PROJECT-STAGE */

export const postProjectStage = async (
  requestData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "project-stages/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST CAMPAIGN */

export const postCampaigns = async (
  requestData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "campaigns/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST DEAL */

export const postDeals = async (
  requestData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "deals/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST BRAND */

export const postBrands = async (
  requestData: FormData,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "brands/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: requestData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST CREATOR */

export const postCreators = async (
  requestData: FormData,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "creators/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: requestData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// POST USER PROFILE

export const postUserProfile = async (
  requestData: FormData,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "users/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
      body: requestData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

////////////////////////////////////////////////////////////////////////
/******************************  GET CALLS  ***************************/
////////////////////////////////////////////////////////////////////////

// GET DATA BY ID
export const getDataById = async (
  endpoint: string,
  id: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + `${endpoint}/${id}/`;

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET STATS

export const getStats = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "dashboard/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET PROJECTS

export const getProjects = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "projects/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET PROJECT DETAILS

export const getProjectsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "projects/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET PROJECT-STAGE

export const getProjectStages = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "project-stages/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET CAMPAIGNS

export const getCampaigns = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "campaigns/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET CAMPAIGNS DETAIL

export const getCampaignsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "campaigns/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET CAMPAIGN-STAGE

export const getCampaignStages = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "campaign-stages/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET DEALS

export const getDeals = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "deals/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET DEALS DETAIL

export const getDealsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "deals/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET DEAL-STAGE

export const getDealStages = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "deal-stages/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET BRANDS

export const getBrands = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "brands/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET BRANDS DETAIL

export const getBrandsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "brands/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET CREATORS

export const getCreators = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "creators/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET CREATORS DETAIL

export const getCreatorsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "creators/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

// GET USER PROFILE

export const getUserProfile = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + "users/";

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback && errorCallback(error);
      });
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

////////////////////////////////////////////////////////////////////////
/********************  PROFILE BUTTON CALLS  *************************/
////////////////////////////////////////////////////////////////////////

// PROJECT PROFILE BUTTONS

export const uploadContract = async (
  projectId: string,
  file: Blob,
  callback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}projects/${projectId}/upload-contract/`;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback(error);
  }
};

export const viewContract = (projectId: string) => {
  return `${DEPLOYED_API_BASE_URL}projects/${projectId}/view-contract/`; // Assuming this endpoint streams the file back to the client
};

export const downloadContract = (projectId: string) => {
  return `${DEPLOYED_API_BASE_URL}projects/${projectId}/download-contract/`; // Assuming this endpoint sets 'Content-Disposition' to attachment in headers
};

////////////////////////////////////////////////////////////////////////
/********************  LOCK CALLS  *************************/
////////////////////////////////////////////////////////////////////////

// LOCK / UNLOCK CAMPAIGN

export const lockCampaign = async (campaignId: any) => {
  const url = DEPLOYED_API_BASE_URL + `campaigns/${campaignId}/lock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const unlockCampaign = async (campaignId: any) => {
  const url = DEPLOYED_API_BASE_URL + `campaigns/${campaignId}/unlock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

// LOCK / UNLOCK PROJECT

export const lockProject = async (projectId: any) => {
  const url = DEPLOYED_API_BASE_URL + `projects/${projectId}/lock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const unlockProject = async (projectId: any) => {
  const url = DEPLOYED_API_BASE_URL + `projects/${projectId}/unlock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

// LOCK / UNLOCK DEAL

export const lockDeal = async (dealId: any) => {
  const url = DEPLOYED_API_BASE_URL + `deals/${dealId}/lock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const unlockDeal = async (dealId: any) => {
  const url = DEPLOYED_API_BASE_URL + `deals/${dealId}/unlock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

// LOCK / UNLOCK BRAND

export const lockBrand = async (brandId: any) => {
  const url = DEPLOYED_API_BASE_URL + `brands/${brandId}/lock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const unlockBrand = async (brandId: any) => {
  const url = DEPLOYED_API_BASE_URL + `brands/${brandId}/unlock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

// LOCK / UNLOCK CREATOR

export const lockCreator = async (creatorId: any) => {
  const url = DEPLOYED_API_BASE_URL + `creators/${creatorId}/lock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const unlockCreator = async (creatorId: any) => {
  const url = DEPLOYED_API_BASE_URL + `creators/${creatorId}/unlock/`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    })
      .then((response) => response.json())
      .catch((error: any) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

////////////////////////////////////////////////////////////////////////
/************************  CSV EXPORT CALLS  **************************/
////////////////////////////////////////////////////////////////////////

export const exportCSV = async (category: string, teamId: any, filename: string) => {
  try {
    const exportUrl = DEPLOYED_API_BASE_URL + `${category}/${teamId}/export/`;

    const response = await fetch(exportUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const csvData = await response.text();

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
  }
};