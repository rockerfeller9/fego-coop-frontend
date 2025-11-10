export interface User {
  id: string;
  name: string;
  email: string;
  membershipNumber: string;
  graduationYear: number;
  isAuthenticated: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  membershipNumber: string;
  graduationYear: number;
  joinDate: string;
  status: 'active' | 'inactive';
  contributions: number;
}

export interface WelfareRequest {
  id: string;
  memberId: string;
  memberName: string;
  type: 'medical' | 'emergency' | 'education' | 'other';
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  dateRequested: string;
}

export interface Investment {
  id: string;
  name: string;
  description: string;
  minimumAmount: number;
  expectedReturn: string;
  duration: string;
  riskLevel: 'low' | 'medium' | 'high';
  availableShares: number;
  status: 'open' | 'closed';
}

export interface InvestmentParticipation {
  id: string;
  memberId: string;
  investmentId: string;
  investmentName: string;
  amount: number;
  shares: number;
  dateInvested: string;
  status: 'active' | 'matured' | 'withdrawn';
}

export interface Loan {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  interestRate: number;
  duration: number; // in months
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  applicationDate: string;
  approvalDate?: string;
  monthlyPayment?: number;
  amountPaid?: number;
  balance?: number;
}

export interface LoanApplication {
  amount: number;
  duration: number;
  purpose: string;
  employmentStatus: string;
  monthlyIncome: number;
  guarantor1Name: string;
  guarantor1Contact: string;
  guarantor2Name: string;
  guarantor2Contact: string;
}
