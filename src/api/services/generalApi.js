import axios from 'axios';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

const API_BASE_URL = 'https://test.369ai.biz:3016'
export const API_ENDPOINTS = {
    VIEW_PRODUCTS: '/viewProducts',
    VIEW_CATEGORIES: '/viewCategories',
    VIEW_WAREHOUSE: `/viewWarehouses`,
    VIEW_CUSTOMERS: '/viewCustomers',
    VIEW_QUOTATION: '/viewQuotation',
    VIEW_AUDITING: '/viewAuditing',
    VIEW_CUSTOMER_VISIT_LIST: '/viewCustomerVisitList',
    VIEW_MARKET_STUDY: '/viewMarketStudy',
    VIEW_INVENTORY_BOX_REQUEST: '/viewInventoryboxrequest',
    VIEW_ENQUIRY_REGISTER: '/viewEnquiryRegister',
    VIEW_LEAD: '/viewLead',
    VIEW_PIPELINE: '/viewPipeline',
    VIEW_MEETINGS: '/viewCustomerSchedule',
    VIEW_VISIT_PLAN: '/viewVisitPlan'
};
const handleApiError = (error) => {
    console.log('API error api-utils: ', error);
    throw error;
  };
  const get = async(endpoint, params = {}) => {
    try{
        const url = `${API_BASE_URL}${endpoint}`;
        console.log('API request:', url, 'with params:', params);
        const response = await axios.get(url,{ params });
        return response.data;
    } catch (error){
        handleApiError(error);
    }
  }

  export const fetchEnquiryRegister = async ({offset,limit, loginEmployeeId}) => {
    try{
        const queryParams = {
            offset,
            limit,
            ...(loginEmployeeId !== undefined && { login_employee_id: loginEmployeeId }),
          };
          const response = await get(API_ENDPOINTS.VIEW_ENQUIRY_REGISTER, queryParams);
          return response.data;
        
    } catch (error){
        handleApiError(error);
        throw error;
    }
  }
  export const fetchCustomers = async ({ offset, limit, searchText }) => {
    try {
      const queryParams = {
        offset,
        limit,
        ...(searchText !== undefined && { name: searchText }),
      };
      const response = await get(API_ENDPOINTS.VIEW_CUSTOMERS, queryParams);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };