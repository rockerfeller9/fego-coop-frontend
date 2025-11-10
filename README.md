# FEGO Alumni Cooperative - Frontend

A modern, multipurpose cooperative website for High School Alumni, built with React and TypeScript.

## Features

### 🎓 Member Management
- Member directory with profiles
- Membership tracking and status
- Contribution history

### ❤️ Member Welfare
- Welfare assistance requests (medical, emergency, education)
- Request submission and tracking
- Status monitoring (pending, approved, rejected)
- Support for member needs

### 📈 Investment Opportunities
- Multiple investment options with varying risk levels
- Real-time portfolio tracking
- Detailed investment information
- Expected returns and duration tracking

### 💰 Low Interest Loans
- 5% annual interest rate loans
- Loan calculator
- Application form with guarantor information
- Loan status tracking
- Repayment management

## Tech Stack

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Lucide React** - Icons
- **CSS3** - Styling

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rockerfeller9/fego-coop-frontend.git
cd fego-coop-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
│   ├── Auth.tsx       # Login/Register
│   ├── Dashboard.tsx  # Main dashboard
│   ├── Members.tsx    # Member directory
│   ├── Welfare.tsx    # Welfare management
│   ├── Investments.tsx # Investment opportunities
│   └── Loans.tsx      # Loan management
├── types/         # TypeScript type definitions
├── App.tsx        # Main app component
├── App.css        # Main styles
└── main.tsx       # Entry point
```

## Features Overview

### Authentication
- Login and registration system
- User session management
- Role-based access (future enhancement)

### Dashboard
- Quick statistics overview
- Member count and welfare fund status
- Investment and loan summaries
- Personal contribution tracking

### Member Welfare
- Submit welfare requests
- Track request status
- View welfare history
- Different categories (medical, education, emergency, other)

### Investments
- Browse available investment opportunities
- View investment details and risk levels
- Track personal investments
- Multiple investment types (real estate, agriculture, technology, bonds)

### Loans
- Apply for low-interest loans (5% annual)
- Built-in loan calculator
- Guarantor information management
- Track loan status and repayments
- Eligibility requirements display

## Future Enhancements

- Backend API integration
- Real-time notifications
- Payment gateway integration
- Document upload functionality
- Advanced reporting and analytics
- Mobile app version
- Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact the FEGO Alumni Cooperative administration.