const bcrypt = require("bcrypt");

const password = ""; // Ganti dengan password yang ingin di-hash

bcrypt.hash(password, 10).then(hash => {
  console.log(hash);
});
