using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select EmployeeId, EmployeeName, Department,
                            convert(varchar(10),DateOfJoining,120) as DateOfJoining, PhotoFileName
                            from dbo.Employee
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDataSource))
            {
                sqlConnection.Open();
                using (SqlCommand command = new SqlCommand(query, sqlConnection))
                {
                    sqlDataReader = command.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                    sqlConnection.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Employee employee)
        {
            string query = @"
                            insert into dbo.Employee
                            (EmployeeName, Department,DateOfJoining,PhotoFileName)
                            values(@EmployeeName, @Department,@DateOfJoining,@PhotoFileName)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDataSource))
            {
                sqlConnection.Open();
                using (SqlCommand command = new SqlCommand(query, sqlConnection))
                {
                    command.Parameters.AddWithValue("@EmployeeName", employee.EmployeeName);
                    command.Parameters.AddWithValue("@Department", employee.Department);
                    command.Parameters.AddWithValue("@DateOfJoining", employee.DateOfJoining);
                    command.Parameters.AddWithValue("@PhotoFileName", employee.PhotoFileName);
                    sqlDataReader = command.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                    sqlConnection.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Employee employee)
        {
            string query = @"
                            update dbo.Employee
                            set EmployeeName=@EmployeeName, 
                                Department=@Department,
                                DateOfJoining=@DateOfJoining,
                                PhotoFileName=@PhotoFileName
                            where EmployeeId = @EmployeeId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDataSource))
            {
                sqlConnection.Open();
                using (SqlCommand command = new SqlCommand(query, sqlConnection))
                {
                    command.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId);
                    command.Parameters.AddWithValue("@EmployeeName", employee.EmployeeName);
                    command.Parameters.AddWithValue("@Department", employee.Department);
                    command.Parameters.AddWithValue("@DateOfJoining", employee.DateOfJoining);
                    command.Parameters.AddWithValue("@PhotoFileName", employee.PhotoFileName);
                    sqlDataReader = command.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                    sqlConnection.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.Employee
                            where EmployeeId = @EmployeeId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader sqlDataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDataSource))
            {
                sqlConnection.Open();
                using (SqlCommand command = new SqlCommand(query, sqlConnection))
                {
                    command.Parameters.AddWithValue("@EmployeeId", id);
                    sqlDataReader = command.ExecuteReader();
                    table.Load(sqlDataReader);
                    sqlDataReader.Close();
                    sqlConnection.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}
