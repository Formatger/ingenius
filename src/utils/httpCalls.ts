import { DEPLOYED_API_BASE_URL } from "./apiConfig";

////////////////////////////////////////////////////////////////////////
/****************************  AUTH CALLS  ****************************/
////////////////////////////////////////////////////////////////////////

// REFRESH TOKEN

export const refreshToken = async (errorCallback?: (error: any) => void) => {
  if (localStorage.refresh_token) {
    const url = DEPLOYED_API_BASE_URL + 'token/refresh/';

    try {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: localStorage.refresh_token }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('access_token', data.access);
        })
        .catch((error) => {
          errorCallback && errorCallback(error);
        });
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  }
}

////////////////////////////////////////////////////////////////////////
/******************************  PUT CALLS  ***************************/
////////////////////////////////////////////////////////////////////////

/* PUT PROJECT*/

export const putProject = async (
  projectId: number,
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  console.log("PUT successful",updatedData)
  const url = `${DEPLOYED_API_BASE_URL}projects/${projectId}/`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* PUT CAMPAIGN */

export const putCampaign = async (
  campaignId: string,
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  console.log("PUT successful",campaignId)
  const url = `${DEPLOYED_API_BASE_URL}campaigns/${campaignId}/`; 

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
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
  console.log("PUT successful",dealId)
  const url = `${DEPLOYED_API_BASE_URL}deals/${dealId}/`; 

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
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
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  console.log("PUT successful",brandId)
  const url = `${DEPLOYED_API_BASE_URL}brands/${brandId}/`; 

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
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
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  console.log("PUT successful",creatorId)
  const url = `${DEPLOYED_API_BASE_URL}creators/${creatorId}/`; 

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

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
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
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

/* DELETE CAMPAGIN */

export const deleteCampaign = async (
  campaignId: number,
  callback: () => void, 
  errorCallback: (error: any) => void
) => {
  const url = `${DEPLOYED_API_BASE_URL}campaigns/${campaignId}/`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
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
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
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
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
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
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
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

/* POST PROJECT */

export const postProjects = async (
  requestData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'projects/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
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
  const url = DEPLOYED_API_BASE_URL + 'project-stages/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
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
  const url = DEPLOYED_API_BASE_URL + 'campaigns/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
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
  const url = DEPLOYED_API_BASE_URL + 'deals/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST BRAND */

export const postBrands = async (
  requestData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'brands/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    callback(data);
  } catch (error) {
    errorCallback && errorCallback(error);
  }
};

/* POST CREATOR */

export const postCreators = async (
  requestData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'creators/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
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

// GET PROJECTS

export const getProjects = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'projects/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET PROJECT DETAILS

export const getProjectsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'projects/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET PROJECT-STAGE

export const getProjectStages = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'project-stages/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET CAMPAIGNS

export const getCampaigns = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'campaigns/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET CAMPAIGNS DETAIL

export const getCampaignsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'campaigns/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET CAMPAIGN-STAGE

export const getCampaignStages = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'campaign-stages/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}


// GET DEALS

export const getDeals = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'deals/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET DEALS DETAIL

export const getDealsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'deals/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET DEAL-STAGE

export const getDealStages = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'deal-stages/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}


// GET BRANDS 

export const getBrands = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'brands/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET BRANDS DETAIL

export const getBrandsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'brands/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET CREATORS

export const getCreators = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'creators/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}

// GET CREATORS DETAIL

export const getCreatorsDetail = async (
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  const url = DEPLOYED_API_BASE_URL + 'creators/';

  try {
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
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
}
