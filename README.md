# Simple Todo List
##### oleh : [Novi Irnawati]

Aplikasi ini adalah tugas di week 1 phase 2. Fitur utamanya adalah :
  - Menyimpan todo list berdasarkan user
  - Mengedit todo list berdasarkan user

### Detail :
Aplikasi ini menggunakan beberapa teknologi dan tools antara lain :
* [bcrypt] - library untuk keperluan enkripsi password
* [express] - network app framework
* [sequelize] - orm
* [postgresql] - basis data
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]

### Routes
pertama, buka localhost di port 300 dengan mengetik
```rs
http://localhost:3000
```
Lalu, lanjutkan dengan route sesuai kebutuhanmu ! detailnya di bawah ini
|Method| Route | Fungsi |
| ------ | ------ | ------ |
|GET| /api/todos/:id | melihat todo berdasarkan id todo, hanya dapat melihat apabila login sebagai owner dari todo tersebut |
|GET| /api/todos |  melihat semua todo list yang dimiliki user yang sedang login|
|POST| /api/todos | create new todo untuk user yang sedang login |
|POST| /api/signup | create new user |
|POST| /api/signin | login to user |
|DELETE| /api/todos/:id | delete todo berdasarkan id todo, hanya dapat dilakukan oleh user yang create todo tersebut |
|PUT| /api/todos/:id | update todo berdasarkan id todo, hanya dapat dilakukan oleh user yang create todo tersebut |
|PATCH| /api/todos/:id | update todo berdasarkan id todo, hanya dapat dilakukan oleh user yang create todo tersebut |

[bcrypt]: <https://github.com/noviirna>
[express]: <https://github.com/noviirna>
[sequelize]: <https://github.com/noviirna>
[postgresql]: <https://github.com/noviirna>
[node.js]: <https://github.com/noviirna>
[Express]: <https://github.com/noviirna>
[Novi Irnawati]: <https://github.com/noviirna>
