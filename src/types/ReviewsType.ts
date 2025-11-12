export interface Customer {
  idCustomer: number;
  name: string;
}

export interface Company {
  idCompany: number;
  name: string;
}

export interface Reviews {
  idReview: number;
  customerId: number;
  companyId: number;
  date: string;
  rating: number;
  comment: string;
  customer: Customer;
  company: Company;
};