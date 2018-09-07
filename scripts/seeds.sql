USE my_finances;

INSERT INTO Users (username, month, isAdmin, dev)
VALUES ("Strangebrewer", "Aug", true, true);

INSERT INTO Balances (UserId)
VALUES ("1");

INSERT INTO Notes (UserId)
VALUES ("1");

INSERT INTO Expenses (UserId, month)
VALUES ("1", "Aug");