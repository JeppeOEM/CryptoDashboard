dotnet aspnet-codegenerator controller -name UsersController -async -api -m Section -dc Context -outDir Controllers

dotnet new gitignore

dotnet-ef tool for migrations
https://www.nuget.org/packages/dotnet-ef

// Init migrations
if deleted also delete \_EFMigrationsHistory
then run:

dotnet ef migrations add InitialCreate

Create Model
Autogenerate controller
Add DbSet to Context
Add migration: dotnet ef migrations Name (app must not be running)
Apply migration: dotnet ef database update

Datatypes:

Partial Class: split the definition of a single class into multiple files.
