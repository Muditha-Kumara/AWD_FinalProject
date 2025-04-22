# SmartLoan Calculator - Revised Phase 1 Submission

---

## 👥 Team Members
- **Chuks**
- **Muditha**

---

## 🧑‍💻 User Personas

### 1. **Sarah – University Student**
- **Age**: 21  
- **Goals**: Understand student loan repayment terms and save calculations  
- **Pain Points**: Needs a simple way to save and retrieve calculations  
- **Tech Savviness**: Moderate  
- **Device**: Smartphone  

### 2. **James – Small Business Owner**
- **Age**: 38  
- **Goals**: Compare business loan options  
- **Pain Points**: Needs to save different loan scenarios  
- **Tech Savviness**: High  
- **Device**: Laptop/Desktop  

### 3. **Anita – Young Professional**
- **Age**: 27  
- **Goals**: Explore auto loan plans  
- **Pain Points**: Wants to track different loan scenarios  
- **Tech Savviness**: Moderate  
- **Device**: Smartphone and Laptop  

---

## 🔄 Use Cases and User Flows

### 1. **Use Case: User Registration**
- **Flow**:  
    `[Start] → [Registration Page] → Enter Email/Password → [Submit] → [Success] → Redirect to Login`  
    ↘ `[Error] → Show validation message`

### 2. **Use Case: User Login**
- **Flow**:  
    `[Start] → [Login Page] → Enter Credentials → [Submit] → [Success] → Redirect to Calculator`  
    ↘ `[Error] → Show error message`

### 3. **Use Case: Calculate and Save Loan**
- **Flow**:  
    `[Logged In] → [Calculator Page] → Enter Loan Details → [Calculate] → [View Results] → [Save] → [Success Message]`

### 4. **Use Case: View Saved Calculations**
- **Flow**:  
    `[Logged In] → [Dashboard] → [View History] → [Display Saved Calculations] → [Select to Reuse]`

### 5. **Use Case: Compare Loan Options**
- **Flow**:  
    `[Logged In] → [Calculator] → Enter First Scenario → [Save] → Enter Second Scenario → [Save] → [View Comparison]`

---

## 🎨 UI Prototypes

### **Key Screens**
1. **Login/Registration Screen**
     - Email field  
     - Password field  
     - Login/Register buttons  
     - Form validation messages  

2. **Calculator Screen**
     - Loan amount input  
     - Term slider  
     - Interest rate display  
     - Calculate button  
     - Save button (visible when logged in)  

3. **History Panel**
     - List of saved calculations  
     - Timestamps  
     - Delete option  

---

## 🏗️ Information Architecture and Technical Design

### **Front-End**
- **Framework**: React.js  
- **State Management**: Context API  
- **UI Library**: TailwindCSS  
- **Testing**: Jest  

### **Back-End**
- **Runtime**: Node.js with Express  
- **Authentication**: JWT  
- **Database**: AWS DynamoDB  
- **API**: RESTful endpoints  

### **Data Flow**
1. User registers → Backend creates user record  
2. User logs in → Receives JWT token  
3. Frontend stores token  
4. User saves calculation → Stored with user ID  
5. User views history → Requests data with JWT  

---

## 📅 Project Management and User Testing

### **Project Timeline**
- **Week 1**: Definition and planning (current phase)  
- **Week 2**: Build front-end structure + API test mockup  
- **Week 3**: Integrate full back-end and handle edge cases  
- **Week 4**: Testing, debugging, and user feedback  
- **Week 5**: Final polish and presentation prep  

### **User Testing Plan**
1. **Test Cases**:
     - Registration flow  
     - Login flow  
     - Calculation saving  
     - History retrieval  

2. **Participants**: 3 users per persona  

3. **Metrics**:
     - Task completion rate  
     - Time per task  
     - Error frequency  

---