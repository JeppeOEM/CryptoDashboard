using DashboardApi.Models;

namespace DashboardApi.Data
{
    public class UserRepository : IUserRepo
    {
        private readonly Context _context;

        public UserRepository(Context context)
        {
            _context = context;
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() > 0;
        }

        // public bool AddEntity<T>(T entityToAdd)
        public void AddEntity<T>(T entityToAdd)
        {
            if (entityToAdd != null)
            {
                _context.Add(entityToAdd);
                // return true;
            }
            // return false;
        }

        // public bool AddEntity<T>(T entityToAdd)
        public void RemoveEntity<T>(T entityToAdd)
        {
            if (entityToAdd != null)
            {
                _context.Remove(entityToAdd);
                // return true;
            }
            // return false;
        }

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users = _context.Users.ToList<User>();
            return users;
        }

        public User GetSingleUser(int userId)
        {
            User? user = _context.Users
                .Where(u => u.UserId == userId)
                .FirstOrDefault<User>();

            if (user != null)
            {
                return user;
            }

            throw new Exception("Failed to Get User");
        }


    }
}