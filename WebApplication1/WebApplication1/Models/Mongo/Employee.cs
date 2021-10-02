using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MongoDB.Bson;

namespace WebApplication1.Models.Mongo
{
    public class Employee
    {
        public ObjectId Id { get; set; }

        public int EmployeeId { get; set; }

        public string EmployeeName { get; set; }

        public string Department { get; set; }

        public string DateOfJoining { get; set; }

        public string PhotoFileName { get; set; }
    }
}
