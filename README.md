# Gift Shop Management Dashboard

A comprehensive dashboard for managing gift shop inventory, tracking sales, and analyzing sales history.

## Live URL
- [Gift Shop Management Dashboard](https://gift-gallery.netlify.app/)

## Server URL
- [Gift Shop Server](https://gift-gallery-theta.vercel.app/)

## GitHub Repositories
- **Client:** [Frontend Repository](https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-fronten-hrshihab)
- **Server:** [Backend Repository](https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-backend-hrshihab)



## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Authentication](#authentication)
6. [Functionality](#functionality)
7. [Requirements](#requirements)


## Features
- **User Registration and Login:** Secure authentication using JWT.
- **Role Management:** Different functionalities for Managers and Sellers.
- **CRUD Operations:** Add, delete, update, and view products.
- **Sales Management:** Track and manage sales with detailed forms.
- **Sales History:** View sales history categorized by various time frames.
- **Gift Filtering:** Comprehensive filtering system for managing inventory.
- **Real-time UI Updates:** Real-time updates using RTK Query and Redux.
- **Bulk Delete:** Efficient bulk delete feature for inventory management.
- **Duplicate & Edit:** Easily create new products based on existing ones.
- **Coupon & Discount:** Coupon code functionality during checkout.
- **Invoice Download:** Download invoices as PDFs after sales.

## Technologies Used
- React
- Redux & RTK Query
- React Hook Form
- Ant Design
- Tailwind CSS
- JWT for Authentication
- Vite for Building and Development

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-fronten-hrshihab.git
   cd l2-b2-assignment-6-fronten-hrshihab
2. **Install dependencies:**
     ```bash
     npm install
3. **Start the development server:**
```bash
    npm run dev
```
4. **Usage**
- Register and login as either a Manager or Seller.
- Manage inventory by adding, updating, or deleting products.
- Track sales by selling products and viewing sales history.
- Use filters to narrow down gift selections.
- Apply coupons during checkout for discounts.
- Download invoices after completing sales.
5. **Authentication**
- User Registration and Login: Secure authentication using JWT.
6. **Roles:**
- Manager: Can add, delete, and modify products.
- Seller: Can only sell products.
7. **Functionality**
- Gift Shop Management
- CRUD Operations:
 - Add, delete, update, and view products.
- **Filtering System:**
Filter by ```price, occasion, recipient, category, theme, brand, and other attributes.```
8. **Sales Management**
- Sales Form:
  - Quantity, buyer name, date, and seller details.
9. **Sales History**
- View categorized sales history (weekly, daily, monthly, yearly).
10. **User Interface Features**
- Real-time UI updates with RTK Query.
- State management with Redux.
- Bulk Delete
- Select and delete multiple products simultaneously.
- Duplicate & Edit
- Create new products based on existing ones.
11. **Coupon & Discount**
- Apply coupon codes during checkout.
12. **Invoice Download**
- Download PDF invoices for completed sales.
