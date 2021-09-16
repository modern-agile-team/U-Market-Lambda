---
name: API 스프린트
about: API를 설계하고, 명세로 기록한다.
title: ''
labels: API, 서버
assignees: ''

---

## 목적
> 목적

<br>

### 💡 API 명세서
> 1. 00 API
* Request

**URL :**  /api/
**Method :** GET

<br>

* Response  

**Status** 
>**성공 :** 200 (OK)
>**실패 :** 
  (1) 401 (Unauthorized)  

**Content-type :** application/json; charset=utf-8

* 성공
```js
{
   success: true,
   msg: "",
}
```

<br>

* 실패
```js
// 주석
{
   success: false,
   msg: ""
}
```

<br>
<br>
