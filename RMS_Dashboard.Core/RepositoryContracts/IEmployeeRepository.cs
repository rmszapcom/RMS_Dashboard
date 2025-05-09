﻿using RMS_Dashboard.Core.Entities;

namespace RMS_Dashboard.Core.RepositoryContracts;

public interface IEmployeeRepository
{
    Task<List<Employee>> GetAllEmployees();

}