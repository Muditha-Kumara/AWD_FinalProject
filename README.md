# Phase 4 – Project Presentation

## 🎯 Project Title
**SmartLoan Calculator**

## 📝 [Project Overview](https://github.com/Muditha-Kumara/AWD_FinalProject/blob/phase-1/Phase_1/Project_phase_1.md)
The SmartLoan Calculator is a responsive web application designed to simplify loan repayment calculations. It targets users such as students, small business owners, and young professionals who need to calculate, save, and compare loan options. The project aims to provide a user-friendly interface with secure authentication and robust backend support.

## 📌 Use Case Summary
| Use Case                              | Implemented (Yes/No) | Demonstration / Notes                                                                 |
|---------------------------------------|----------------------|---------------------------------------------------------------------------------------|
| User logs in and makes a calculation  | Yes                  | Implemented using secure session handling. Demo at 2:45 in the video.                |
| User saves loan calculations          | Yes                  | Users can save calculations securely. Demo at 4:10 in the video.                     |
| User compares loan options            | Yes                  | Comparison feature with charts. Demo at 6:30 in the video.                           |
| Admin deletes resources               | No                   | Not prioritized, possible future work.                                               |

## ✍️ Technical Implementation
- **[Frontend](https://github.com/Muditha-Kumara/AWD_FinalProject/blob/phase-3/frontend/package.json)**: React.js with Vite, Bootstrap for styling, and Chart.js for data visualization.
- **[Backend](https://github.com/Muditha-Kumara/AWD_FinalProject/blob/phase-3/frontend/package.json)**: Node.js with Express, PostgreSQL for database management, and JWT for authentication.
- **[Architecture](https://github.com/Muditha-Kumara/AWD_FinalProject/tree/phase-3/backend/src)**: Follows the MVC pattern with centralized error handling and reusable middleware.
- **[Deployment](https://github.com/Muditha-Kumara/AWD_FinalProject/blob/phase-3/docker-compose.yml)**: Dockerized services for frontend, backend, and database. Automated [CI/CD pipeline](https://github.com/Muditha-Kumara/AWD_FinalProject/blob/phase-3/.github/workflows/deploy.yml) using GitHub Actions.

## 🚂 Development Process
The project progressed through several phases:
1. **Planning**: Defined user personas and use cases.
2. **Design**: Created wireframes and UI prototypes.
3. **Implementation**: Developed core features like loan calculations, history tracking, and comparison.
4. **[Testing](https://github.com/Muditha-Kumara/AWD_FinalProject/blob/phase-3/backend/tests/userRoutes.test.js)**: Conducted user testing and fixed critical bugs.
5. **[Deployment](https://github.com/Muditha-Kumara/AWD_FinalProject/blob/phase-3/.github/workflows/deploy.yml)**: Set up Docker and CI/CD pipelines for seamless deployment.

## ☀️ Reflection and Future Work
- **What worked well**: The modular architecture and centralized error handling improved maintainability.
- **Challenges**: Handling edge cases in loan calculations and ensuring secure authentication.
- **Future improvements**: Add an admin dashboard, enhance mobile responsiveness, and integrate advanced analytics.

## 📊 [Work Hours Log](https://github.com/Muditha-Kumara/AWD_FinalProject/blob/phase-3/LogBook.md)
| Date       | Time | Task                                      |
|------------|------|------------------------------------------|
| 04-03-2025 | 2h   | Defined use cases                        |
| 10-04-2025 | 3h   | Research on similar projects             |
| 15-04-2025 | 4h   | Wireframing and UI design                |
| 20-04-2025 | 5h   | Backend setup                            |
| 25-04-2025 | 3h   | API design                               |
| 30-04-2025 | 4h   | Frontend development                     |
| 10-04-2025 | 5h   | User authentication                      |
| 20-04-2025 | 3h   | Testing and debugging                    |
| 01-05-2025 | 3h   | Documentation                            |
| 05-05-2025 | 6h   | History page implementation              |
| 07-05-2025 | 5h   | Real-time charts integration             |
| 09-05-2025 | 4h   | Error handling improvements              |
| 11-05-2025 | 6h   | Docker setup                             |
| 13-05-2025 | 5h   | GitHub Actions CI/CD pipeline            |
| 14-05-2025 | 4h   | Middleware enhancements                  |
| 15-05-2025 | 6h   | Library testing                          |
| 16-05-2025 | 8h   | Final debugging and optimization         |
| **Total**  | 120h |                                          |

## 🌐 Live Application Link
You can access the live application at [http://54.242.0.197](http://54.242.0.197).

## 🪢 Presentation Link
Presented live during the project showcase.