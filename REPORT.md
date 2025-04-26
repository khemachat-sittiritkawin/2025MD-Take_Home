# 📱 แบบฟอร์มส่งงานสอบ Take-home
**ชื่อ - นามสกุล (Full Name):** ```Khemachat Sittiritkawin```  
**รหัสนักศึกษา (Student ID):** ```6631503005```  
**ชื่อแอป (App Name):**    
**Framework ที่ใช้ (Framework Used):** ```React Native```  
**ลิงก์ GitHub Repository:** [here](https://github.com/khemachat-sittiritkawin/2025MD-Take_Home.git)   
**ลิงก์ไฟล์ติดตั้ง (APK/IPA):** [ใส่ลิงก์ที่นี่ | Insert link here]

---

## 1. การออกแบบแอป | App Concept and Design (2 คะแนน / 2 pts)

### 1.1 ผู้ใช้งานเป้าหมาย | User Personas  
**ตัวอย่าง (Example):**
```markdown
Persona 1:  
- ชื่อ: นัท  
- อายุ: 20 ปี  
- อาชีพ: นักศึกษาปี 2  
- ความต้องการ: ต้องการจัดตารางเรียนและเตือนสอบให้มีวินัยมากขึ้น

Persona 2:  
- ชื่อ: แพรว  
- อายุ: 22 ปี  
- อาชีพ: นักศึกษาฝึกงาน  
- ความต้องการ: ต้องการวางแผนงานและกำหนดเป้าหมายประจำสัปดาห์
```

### 1.2 เป้าหมายของแอป | App Goals  
**ตัวอย่าง (Example):**
```markdown
- ช่วยนักศึกษาจัดตารางเรียนรายสัปดาห์
- เพิ่มระบบเตือนสอบและงานที่ต้องส่ง
- มีหน้าแดชบอร์ดรวมกิจกรรมประจำวัน
```

### 1.3 โครงร่างหน้าจอ / Mockup  
**ใส่รูปภาพ หรือคำอธิบายแต่ละหน้าหลัก 3 หน้า | Attach image or describe 3 main pages**

### 1.4 การไหลของผู้ใช้งาน | User Flow  
**ตัวอย่าง (Example):**
```markdown
เปิดแอป > เข้าหน้าแดชบอร์ด > เลือก "เพิ่มงาน" > บันทึก > ตั้งเตือน
```

---

## 2. การพัฒนาแอป | App Implementation (4 คะแนน / 4 pts)

### 2.1 รายละเอียดการพัฒนา | Development Details  
**เครื่องมือที่ใช้ / Tools used:**
```markdown
- React Native 3.19
- Typescript 5.3.3
```

### 2.2 ฟังก์ชันที่พัฒนา | Features Implemented  
**Checklist:**
```markdown
- [x] เพิ่ม / แก้ไข / ลบ ตารางเรียน
- [x] ตั้งเตือนกิจกรรม
- [x] บันทึกงานที่ต้องทำ
- [ ] ซิงก์กับ Google Calendar
```

### 2.3 ภาพหน้าจอแอป | App Screenshots  
**แนบภาพหรือ URL (Attach images or image links):**
```markdown
- ![Dashboard](dashboard.png)
- ![Schedule](schedule.png)
- ![Reminder](reminder.png)
```

---

## 3. การ Build และติดตั้งแอป | Deployment (2 คะแนน / 2 pts)

### 3.1 ประเภท Build | Build Type
- [x] Debug  
- [ ] Release  

### 3.2 แพลตฟอร์มที่ทดสอบ | Platform Tested  
- [x] Android  
- [ ] iOS  

### 3.3 ไฟล์ README และวิธีติดตั้ง | README & Install Guide  
**แนบไฟล์หรือคำอธิบายการติดตั้งแอป | Insert steps**
```markdown
1. ดาวน์โหลดไฟล์ .apk
2. เปิดในอุปกรณ์ Android
3. ติดตั้งผ่าน File Manager
```

---

## 4. การสะท้อนผลลัพธ์ | Reflection (2 คะแนน / 2 pts)

**ตัวอย่างหัวข้อ | Suggested points:**
```markdown
- พบปัญหาความแม่นยำของหน่วยของเวลา ซึ่งเป็นสาเหตุที่แอปนี้ไม่มีหน่วยmillisecondในนาฬิกา เพราะว่าหน่วยmillisecondทำให้แอปทำงานช้า เนื่องจากต้องre-render componentอยู่1000รอบต่อวินาที
- พบปัญหาเวลาใช้ setState กับ async function
- เรียนรู้การใช้ Provider ในการจัดการสถานะ
- หากมีเวลา จะเพิ่มฟีเจอร์ login และ Firebase sync
```

---

## 5. การใช้ AI ช่วยพัฒนา | AI Assisted Development (Bonus / ใช้ประกอบการพิจารณา)

### 5.1 ใช้ AI ช่วยคิดไอเดีย | Idea Generation
```markdown
Prompt ที่ใช้:  
"Give me a better prompt than 'give me app ideas'"
ผลลัพธ์: ได้promptเพื่อหาไอเดียแอปที่ดีกว่าprompt "give me app ideas"

```

### 5.2 ใช้ AI ช่วยออกแบบ UI | UI Layout Prompt
```markdown
Prompt ที่ใช้:  
"Fix the UI"
ผลลัพธ์: AIแก้styleในcomponent ทำให้UIดูสวยขึ้น

"How do I grey out these buttons when isStarted is false"
ผลลัพธ์: AIแก้โค้ดทำให้ปุ่มกลายเป็นสีเทาเวลาตัวแปรisStartedเป็นเท็จ

"How do i add a transparent modal pop-up that shows how much time it took to complete the tasks"
ผลลัพธ์: AIให้โค้ดเพื่อร่างโครงmodal
```

### 5.3 ใช้ AI ช่วยเขียนโค้ด | Code Writing Prompt
```markdown
Prompt ที่ใช้:  
"How do i format a single-digit integer to a two-digit string."
ผลลัพธ์: ได้โค้ดเพื่อformatเลขหนึ่งหลักให้กลายเป็นสองหลัก
```

### 5.4 ใช้ AI ช่วย debug | Debug Prompt
```markdown
ไม่มี
```

### 5.5 ใช้ AI ช่วย Deploy | Deployment Prompt
```markdown
ไม่มี
```

---

## ✅ Checklist ก่อนส่ง | Final Checklist
- [x] กรอกข้อมูลครบทุก Section  
- [x] แนบ GitHub และไฟล์ติดตั้ง  
- [x] สะท้อนผล และใช้ AI อย่างมีเหตุผล  
