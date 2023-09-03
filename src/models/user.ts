import db from "../config/db";

type TUser = {
  userId: number;
  email: string;
  password: string;
  passwordHash: string;
};

const dbInsertUser = (
  email: string,
  password: string,
  passwordHash: string
) => {
  return new Promise<void>((resolve, reject) => {
    db.run(
      "insert into simple_user(email, password, passwordHash) values (?, ?, ?)",
      [email, password, passwordHash],
      (err) => {
        if (err) return reject(err);
        return resolve();
      }
    );
  });
};

const dbGetUser = (email: string) => {
  return new Promise<TUser>((resolve, reject) => {
    db.get<TUser>(
      "select * from simple_user where email = ?",
      [email],
      (err, row) => {
        if (err) return reject(err);
        return resolve(row);
      }
    );
  });
};

const dbGetAllUsers = () => {
  return new Promise<TUser[]>((resolve, reject) => {
    db.all<TUser>("select * from simple_user", (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

export const dbGetUserById = (userId: number) => {
  return new Promise<TUser>((resolve, reject) => {
    db.get<TUser>(
      "select * from simple_user where userId = ?",
      [userId],
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
};

export { dbGetUser, dbGetAllUsers, dbInsertUser as dbInsertSimpleUser };
