USE [AccountsSystem 2]
GO
/****** Object:  StoredProcedure [dbo].[InsertChartFAccount]    Script Date: 11/5/2023 6:35:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[InsertChartFAccount]
@Mid int,
@AccountName varchar(500),
@Debit decimal(18,2),
@Credit decimal(18,2),
@Date date
as
insert into tbl_ChartofAccount (Mid,AccountName) values(1,'ACCOUNT SAVING')
Declare @Id int = Scope_Identity()
insert into tbl_GeneralLedger (Date,RefNo,Debit,Credit,TypeId) values ('11/12/22',1,1000,100000,1)

Select 'OK'
