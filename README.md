# 📋 Client Task - אפליקציה לניהול פרויקטים ומשימות

אפליקציית Angular מודרנית לניהול צוותים, פרויקטים, משימות והערות בסביבה שיתופית.

## 📋 תוכן העניינים
- [תיאור הפרויקט](#תיאור-הפרויקט)
- [דרישות מערכת](#דרישות-מערכת)
- [התקנה](#התקנה)
- [הרצת האפליקציה](#הרצת-האפליקציה)
- [ארכיטקטורה](#ארכיטקטורה)
- [פיצ'רים](#פיצ'רים)
- [טכנולוגיות](#טכנולוגיות)
- [מבנה הפרויקט](#מבנה-הפרויקט)
- [סביבות](#סביבות)
- [בדיקות](#בדיקות)

## 📱 תיאור הפרויקט

**Client Task** היא אפליקציית ניהול משימות (Task Management) המאפשרת למשתמשים:
- ✅ ניהול צוותים שיתופיים
- ✅ יצירה וניהול פרויקטים לפי צוותים
- ✅ ניהול משימות בתוך פרויקטים
- ✅ הוספת הערות על משימות
- ✅ ניהול חברים בצוות
- ✅ עדכון סטטוס משימות
- ✅ אימות משתמש וניהול הרשאות

האפליקציה משתמשת ב**Angular 21** עם **Standalone Components** והיא בנויה בארכיטקטורה מודרנית עם טפול בשגיאות, אימות, ותקשורת עם שרת.

## 🔧 דרישות מערכת

- **Node.js**: גרסה 18.x ומעלה
- **npm**: גרסה 10.9.3
- **Angular CLI**: גרסה 21.1.1

## 📦 התקנה

```bash
# שיכפול הפרויקט
git clone <repository-url>
cd clientTask

# התקנת תלויות
npm install
```

## ▶️ הרצת האפליקציה

### סביבת פיתוח
```bash
npm start
# או
ng serve
```
האפליקציה תהיה זמינה בכתובת: `http://localhost:4200/`

### בנייה לייצור
```bash
ng build --configuration production
```

### הרצה עם SSR (Server-Side Rendering)
```bash
npm run serve:ssr:clientTask
```

## 🏗️ ארכיטקטורה

### Standalone Components
האפליקציה משתמשת בחדש של Angular 14+ - **Standalone Components**:
- אין צורך במודולים (NgModules)
- כל קומפוננטה מנהלת את התלויות שלה
- קוד יותר פשוט וקל לתחזוקה

### שירותים (Services)
```
src/app/services/
├── auth.ts           - ניהול אימות ומשתמשים
├── teams.ts          - API לצוותים
├── projects.ts       - API לפרויקטים
├── tasks.ts          - API למשימות
└── comments.ts       - API להערות
```

### שמירים (Guards)
```
src/app/guards/
└── auth.ts           - בדיקת הרשאות (authGuard, loginGuard)
```

### אינטרספטורים (Interceptors)
```
src/app/interceptors/
└── authInterceptor.ts - הוספת טוקן לכל בקשה HTTP
```

### מודלים (Models)
```
src/app/models/
├── userModel.ts      - מודל משתמש
├── teamModel.ts      - מודל צוות
├── projectModel.ts   - מודל פרויקט
├── taskModel.ts      - מודל משימה
└── commentModel.ts   - מודל הערה
```

## ✨ פיצ'רים

### ניהול משתמשים
- 🔐 **רישום** - יצירת חשבון חדש
- 🔑 **התחברות** - אימות למערכת
- 🚪 **התנתקות** - יציאה מהמערכת
- 💾 שמירת נתוני משתמש ב-localStorage

### ניהול צוותים
- ➕ יצירת צוות חדש
- 👥 הצגת כל הצוותים
- 👤 הוספת חברים לצוות
- 🔄 ניהול תפקידים והרשאות

### ניהול פרויקטים
- ➕ יצירת פרויקט חדש לצוות
- 📋 הצגת פרויקטים לפי צוות
- 📊 סינון ומיון פרויקטים
- 🏠 בחזרה לרשימת הפרויקטים

### ניהול משימות
- ➕ יצירת משימה חדשה
- ✏️ עדכון משימה קיימת
- ✅ שינוי סטטוס משימה
- 📅 הצגת משימות לפי פרויקט
- 🔄 סינון משימות

### הערות ותיקייה
- 💬 הוספת הערות על משימות
- 👁️ הצגת כל ההערות
- 📝 ניהול הערות משימה

## 🛠️ טכנולוגיות

### Frontend Framework
- **Angular 21.1.0** - Framework ראשי
- **TypeScript** - שפת התכנות
- **RxJS 7.8.0** - Reactive Programming

### Material Design & UI
- **Angular Material 21.1.3** - רכיבי UI
- **Angular CDK 21.1.3** - Component Development Kit
- **ngx-toastr 20.0.4** - עלרטים ודרגות

### Server-Side Rendering
- **Angular SSR 21.1.1** - Server-side rendering
- **Express 5.1.0** - שרת Node.js
- **Platform-Server** - SSR תמיכה

### שירותים נוספים
- **date-fns 4.1.0** - עיבוד תאריכים
- **HttpClient** - בקשות HTTP

### Development Tools
- **Angular CLI 21.1.1** - כלי פיתוח
- **Karma & Jasmine** - בדיקות יחידה
- **TypeScript 5.x** - Compiler
- **Prettier** - Format קוד

## 📁 מבנה הפרויקט

```
clientTask/
├── src/
│   ├── app/
│   │   ├── components/          # קומפוננטות
│   │   │   ├── add-comment/
│   │   │   ├── add-member/
│   │   │   ├── add-project/
│   │   │   ├── add-task/
│   │   │   ├── add-team/
│   │   │   ├── get-comments/
│   │   │   ├── get-projects/
│   │   │   ├── get-tasks/
│   │   │   ├── get-teams/
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── not-found/
│   │   │   ├── register/
│   │   │   └── update-task/
│   │   ├── services/            # שירותים
│   │   │   ├── auth.ts
│   │   │   ├── comments.ts
│   │   │   ├── projects.ts
│   │   │   ├── tasks.ts
│   │   │   └── teams.ts
│   │   ├── guards/              # שמירים
│   │   │   └── auth.ts
│   │   ├── interceptors/        # אינטרספטורים
│   │   │   └── authInterceptor.ts
│   │   ├── models/              # מודלים
│   │   ├── environments/        # תצורות סביבה
│   │   ├── app.ts               # Root Component
│   │   ├── app.routes.ts        # ניתוב
│   │   ├── app.config.ts        # תצורה
│   │   └── app.css
│   ├── main.ts                  # Entry Point
│   ├── main.server.ts           # SSR Entry Point
│   ├── server.ts                # Express Server
│   ├── index.html
│   └── styles.css
├── public/                       # Asset סטטיים
├── angular.json                  # תצורת Angular CLI
├── package.json                  # תלויות ספריפטים
├── tsconfig.json               # תצורת TypeScript
└── README.md
```

## 🌍 סביבות

### Development (סביבת פיתוח)
```typescript
// src/app/environments/environment.ts
export const environment = {
  apiUrl: 'http://localhost:3000'  // או כתובת ה-API המקומית
};
```

### Production (סביבת ייצור)
```typescript
// src/app/environments/environment.prod.ts
export const environment = {
  apiUrl: 'https://api.example.com'  // כתובת ה-API בייצור
};
```

בנייה לסביבה ספציפית:
```bash
ng build --configuration production
ng serve --configuration production
```

## 🧪 בדיקות

### הרצת בדיקות יחידה
```bash
npm test
# או
ng test
```

### הרצת בדיקה מסוימת
```bash
ng test --include='**/auth.spec.ts'
```

### בדיקות עם Coverage
```bash
ng test --code-coverage
```

מסגרת הבדיקה: **Jasmine & Karma**

## 🔐 אימות וניהול הרשאות

### AuthGuard
מגן על מסלולים שדורשים אימות:
- `authGuard` - בדיקה אם משתמש מחובר
- `loginGuard` - בדיקה אם משתמש לא מחובר (לעמוד ההתחברות)

### AuthInterceptor
מוסיף את ה-JWT Token לכל בקשה HTTP אוטומטית.

## 📡 API Integration

השירותים מתקשרים עם Backend API בכתובת המוגדרת ב-`environment.ts`:

```typescript
// דוגמה:
this.httpClient.post(`${environment.apiUrl}/auth/login`, credentials)
```

## 💡 הערות לפיתוח

### Standalone Components
כל קומפוננטה מדקלרת את היבוא שלה:
```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ...],
  template: '...'
})
```

### Signals
השימוש ב-`signal` ו-`computed` מה-`@angular/core` לניהול state.

### RxJS
שימוש ב-Observables לתקשורת בין שירותים לקומפוננטות.

### Material Design
משתמש ב-Angular Material לרכיבי ממשק עדכניים ותומכי accessibility.

## 🚀 שדרוג ועדכונים

כדי לעדכן את תלויות ה-Angular:
```bash
ng update @angular/cli @angular/core
```

## 🐛 דיווח על בעיות

אם נתקלת בבעיה:
1. בדוק את הקונסול בדפדפן (F12)
2. בדוק את ה-Console בטרמינל
3. וודא שה-API Server פעיל
4. וודא שה-environment קונפיגורציה נכונה

## 📧 תמיכה

לשאלות או בעיות, יש לפנות לחבר הצוות או לצרוב issue בפרויקט.

---

**Last Updated:** 2026-03-16  
**Angular Version:** 21.1.1  
**Node Version:** 18+  
**Package Manager:** npm 10.9.3
