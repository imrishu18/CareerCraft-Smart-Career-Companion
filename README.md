# CareerCraft – AI-Powered Smart Career Companion

CareerCraft is a **full-stack AI-powered Smart Career Companion** that helps students and professionals accelerate their career journey with **ATS-optimized resumes, AI-generated cover letters, personalized industry insights, and interactive mock interviews** - all in one modern platform.  

---

## 📖 About the Website
- Modern & intuitive **UI/UX** with animated wallpapers and interactive components.  
- **AI-powered career guidance** tailored to user specialization and experience.  
- **Industry Insights** with weekly updates on market trends and salaries.  
- **Smart Resume & Cover Letter Builder** with ATS-optimization, AI improvements, and downloadable formats.
- **Interview Preparation** with quizzes, performance analytics, and improvement tips.  
- Secure **Authentication & Profile Management** with Clerk. 
- **Performance tracking & analytics** for continuous improvement.
- Responsive design ensuring seamless access across devices (mobile, tablet, desktop).
- Scalable architecture with modular components for easy future enhancements.
- Data privacy & security with protected routes and secure storage.

---

## 🔄 Workflow
1. **Sign Up/Login** – Secure user authentication.  
2. **Complete Profile** – Fill details such as skills, bio, work experience.  
3. **Access Insights** – Explore industry-specific data and salary trends.  
4. **Build Resume** – AI-assisted resume builder with editing, saving and downloading features.  
5. **Create Cover Letters** – Generate tailored cover letters for job applications.  
6. **Prepare Interviews** – Practice quizzes with AI feedback and track performance.  
7. **Track Progress** – Monitor analytics and performance graphs.
8. **Profile Management** – Update name, photo, email, delete account. 
9. **Stay Updated** – Receive new insights, tips, and personalized career recommendations regularly.

---

## 📸 Screenshots & Features

### 1. Landing / Home Page  
- Modern UI with **Get Started** button.  
- Clean design and welcoming layout.
- Navigation bar includes Growth Tools (Resume Builder, Cover Letter, Interview Prep) and Industry Insights for quick access.
![Home Page](public/Screenshots/HomePage.png)

### 2. Carousel Wallpaper  
- Animated wallpapers with **AI human illustrations**.  
- Smooth transitions enhancing the user experience.  
![Carousel](public/Screenshots/CareerCraftCarousal.png)

### 3. Powerful Features Section  
- AI-Powered Career Guidance  
- Interview Preparation  
- Industry Insights  
- Smart Resume Creation  
![Features](public/Screenshots/Featureslist.png)

### 4. Stats & WorkFlow Section  
- Covers 50+ industries, 1000+ interview questions, 24/7 AI support.  
- **4-step career growth workflow** explained.  
![How It Works](public/Screenshots/HomePage1.png)

### 5. Testimonials Section  
- User-like testimonials to build trust.
![Testimonials](public/Screenshots/Users.png)

### 6. FAQs & Footer  
- Common questions answered + **Start Your Journey Today** button.  
![FAQ](public/Screenshots/Faqs.png)
![FOOTER](public/Screenshots/Footer.png)

### 7. Authentication  
- Clerk-powered secure sign-in/sign-up.
- Password encryption & session handling. 
![Authentication](public/Screenshots/SignInPage.png)
![Authentication1](public/Screenshots/SignUpPage.png)

### 8. Profile Completion Form  
- Fill specialization, industry, skills, years of experience, professional bio.
- Personalized insights after onboarding.  
![Profile Form](public/Screenshots/IndustryInsights3.png)

### 9. Industry Insights Page  
- Real-time industry outlook, growth, and demand analysis.  
- Weekly updated data.
- Helps users stay updated with current job market trends.
![Industry Insights](public/Screenshots/IndustryInsights.png)

### 10. Salary Graph  
- Interactive graphs showing **min, median, max salary ranges**.
- Helps users set realistic career expectations.
- Visually clear insights for better decision-making.
 
![Salary Graph](public/Screenshots/IndustryInsights1.png)

### 11. Key Industry Trends & Skills  
- Recommendations for skills to improve career prospects.
- Helps users focus on upskilling strategically.
![Trends](public/Screenshots/IndustryInsights2.png)

### 12. Resume Builder Form  
- Add/Edit personal info, work experience, education, projects.
- Intuitive form layout for smooth resume building.
- **AI Improve** button to enhance descriptions.  
![Resume Builder](public/Screenshots/ResumeBuilder.png)
![Resume Builder2](public/Screenshots/ResumeBuilder2.png)
![Resume Builder3](public/Screenshots/ResumeBuilder3.png)
![Resume Builder4](public/Screenshots/ResumeBuilder4.png)

### 13. Resume Preview & Save  
- Live form-to-preview editing with real-time updates.
- Add headings, subheadings, lists, images and links for structured resumes.
- Option to edit, refine, and customize instantly.
- Secure save & retrieval for editing later.
- Save & download resumes as ATS-optimized PDFs.
![Resume Preview](public/Screenshots/ResumeBuilder5.png)
![Resume Preview1](public/Screenshots/ResumeBuilder6.png)

### 14. Cover Letter Generator  
- Fill in job details(job title, description, company) and AI generates a tailored cover letter.
- Saves time and improves chances of selection.
![Cover Letter](public/Screenshots/CoverLetters1.png)
![Cover Letter2](public/Screenshots/CoverLetters2.png)

### 15. Manage Cover Letters  
- View, edit, delete, and create new cover letters.
- Option to quickly create new ones for different job roles.
![Cover Letter Management](public/Screenshots/CoverLetters3.png)
![Cover Letter Management4](public/Screenshots/CoverLetters4.png)

### 16. Interview Preparation Dashboard  
- Past scores, average scores,questions practiced and improvement tips.
- Centralized dashboard motivates consistent practice. 
![Interview Prep](public/Screenshots/InterviewPrep.png)

### 17. Performance Trends Graph  
- Graphical insights of quiz performance over time.
- Detailed breakdown for continuous progress tracking.
- Clear tracking of strengths and areas to improve.
![Performance Graph](public/Screenshots/InterviewPrep.png)
![Performance Graph](public/Screenshots/InterviewPrep1.png)

### 18. Quizzes Section  
- Role-specific questions with explanations and AI feedback(Improvement Tip).
- AI-generated improvement tips after each attempt to help users sharpen their skills.
![Quizzes](public/Screenshots/InterviewPrep2.png)
![Quizzes](public/Screenshots/InterviewPrep3.png)
![Quizzes4](public/Screenshots/InterviewPrep4.png)

### 19. Profile Management  
- Update profile photo, change email, or delete account.
- Flexible profile settings improve personalization.
![Profile Management](public/Screenshots/Profile.png)
![Profile Management](public/Screenshots/Profile1.png)

---

## ⚙️ Tech Stack

CareerCraft is built using a modern full-stack ecosystem:  

- **Frontend:** React, Next.js (App Router), TailwindCSS, Shadcn UI  
- **Backend and Database:** Next.js Server Actions, Prisma ORM, NeonDB (Postgres), Inngest (scheduled tasks)  
- **Authentication & Security:** Clerk Authentication, JWT, CSP headers, rate limiting, secure CRUD operations  
- **AI Integration:** Google Gemini API (`gemini-1.5-flash`) for resume, cover letter, and interview prep  
- **Visualization:** Recharts (salary and performance graphs)
- **Other Tools**: PDF generator (resume download),Optimized queries & error handling for stability.  

---

## 🚀 Installation & Setup
### 1. Clone the repository 
   ```bash
   git clone https://github.com/imrishu18/CareerCraft-Smart-Career-Companion.git
   cd CareerCraft
   ```

### 2. Install dependencies  
   ```bash
   npm install
   ```

### 3. Setup environment variables (`.env` file)  
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxx"
   CLERK_SECRET_KEY="sk_test_xxx"

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

   GEMINI_API_KEY="your_gemini_api_key"
   ```
   
### 4. Setup database
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
   
### 5. Run the project  
   ```bash
   npm run dev
   ```
   
### 6. Access in browser: `http://localhost:3000`  

---

## 👨‍💻 Author
Developed by **Rishu Raj**
