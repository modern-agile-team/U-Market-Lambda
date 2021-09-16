---
name: API 스프린트
about: API를 설계하고, 명세로 기록한다.
title: ''
labels: API, 서버
assignees: ''

---

# 💡 API 명세서
> 설명

<br>

## 1. 00
> **URL:** ```/api/```  
**METHOD:** ```POST```

* Request
   * **Content-Type:** ```application/json; charset=utf-8```
```js
{
   id: 1
}
```

<br>

* Response
   * **Status:** ```201 Created```
   * **Content-Type:** ```application/json; charset=utf-8```

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
