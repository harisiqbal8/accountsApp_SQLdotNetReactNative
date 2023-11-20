using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace WebApplication4
{
    public static class ConnectionString
    {
        public static SqlConnection GetConnection()
        {
            SqlConnection mySqlConnection = new SqlConnection();
            mySqlConnection.ConnectionString = @"Data Source=LAPTOP-HARIS\SQLEXPRESS;Initial Catalog=""AccountsSystem 2"";Integrated Security=True";
            mySqlConnection.Open();
            return mySqlConnection;
        }
    }
}
