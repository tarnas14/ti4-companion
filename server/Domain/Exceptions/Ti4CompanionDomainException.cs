using System;

namespace server.Domain.Exceptions
{
    [Serializable]
    public class Ti4CompanionDomainException : Exception
    {
        public Ti4CompanionDomainException(string message) : base(message)
        {
        }
    }
}