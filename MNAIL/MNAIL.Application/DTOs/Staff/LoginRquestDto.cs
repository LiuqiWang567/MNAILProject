using System;
using System.Collections.Generic;
using System.Text;

namespace MNAIL.Application.DTOs.Staff
{
    public class LoginRquestDto
    {
        public  string? Username { get; set; }
        public bool isAdmin { get; set; }
        public  string? token { get; set; }

    }
}
