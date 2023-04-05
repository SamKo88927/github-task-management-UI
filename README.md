# task management進步表
https://docs.google.com/spreadsheets/d/1fkdjxBEZZm8MAG-aXBVqO9eqZY6JhDtNfSF-O7AUN1U/edit?usp=sharing


此專案為前後端分離專案
另一個Api folder為
https://github.com/SamKo88927/github-task-management-Api
## UI架構說明
介面環境參數說明
REACT_APP_JSON_SECRET = 
REACT_APP_BASE_URL = 
REACT_APP_BACKEND_URL =
REACT_APP_github_Client_ID = 
REACT_APP_github_SECRET = 

-------------------------
REACT_APP_github_Client_ID = 
REACT_APP_github_SECRET = 
為授權給使專案最重要的ID並設置在內
將用Client_ID先去github換取有期限的code字串，
並且code字串會在Api folder那裡處理，回應回來的應為最重要的
access_token並且使用JWT來加密，在UI與API兩端也將放置
JWT_Secret來加密傳輸過程，
並且有關所有的UI axios操作都將夾帶header中的
REACT_APP_JSON_SECRET 來將access_token解密而最後取得授權得以操作
REACT_APP_BASE_URL = 你的UI網址
REACT_APP_BACKEND_URL = 你的API網址 供github callbackURL使用為回傳
上述有修還未整理完成，但目前可使用大部分功能

### 下列為照片說明 說明較為簡略

![1](https://user-images.githubusercontent.com/86094956/229996495-18c7a7e7-2776-4509-97ce-0cc694fe257d.png)
![2](https://user-images.githubusercontent.com/86094956/229996645-235f5dcf-0ebf-4660-9a07-d878db675218.png)
![3](https://user-images.githubusercontent.com/86094956/229996659-a98e0deb-2c74-4fdf-94aa-1231cdc0861f.png)
![4](https://user-images.githubusercontent.com/86094956/229996667-2afe8e25-ad78-49c3-bbd8-551b64b9b8ad.png)
![5](https://user-images.githubusercontent.com/86094956/229996681-3dc09b19-a0bd-421b-9d0b-a104468bb1a6.png)
![6](https://user-images.githubusercontent.com/86094956/229996691-c6597675-3f12-4685-bea9-5598cb41962d.png)

![7](https://user-images.githubusercontent.com/86094956/229996700-02e090a6-6f60-4158-9f8a-dfb21dd54fa3.png)

ppt連結：
https://www.canva.com/design/DAFZ9NPLNOE/0DbYPEP6lxKF7C2VTqEQQA/view?utm_content=DAFZ9NPLNOE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
