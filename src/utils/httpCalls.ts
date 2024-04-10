import { DEPLOYED_API_BASE_URL } from "./apiConfig";

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

/* PUT PROJECT*/

export const putProject = async (
  projectId: string,
  updatedData: any,
  callback: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  console.log("ESTO E SLO QUE PASO",projectId)
  const url = `${DEPLOYED_API_BASE_URL}projects/${projectId}/`; // Asegúrate de incluir el ID del proyecto en la URL

  try {
    const response = await fetch(url, {
      method: 'PUT', // Cambia el método a PUT
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.access_token}`,
      },
      body: JSON.stringify(updatedData), // Envía los datos actualizados en el cuerpo de la solicitud
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
  console.log("ESTO E SLO QUE PASO",campaignId)
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


/* POST PROJECT*/

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

// GET PROJECT STAGE

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

// GET CAMPAIGN STAGE

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

// GET DEAL STAGE

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