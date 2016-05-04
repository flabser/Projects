package projects.page;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.scripting._POJOListWrapper;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;

import java.util.List;

public class Users extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        UserDAO userDAO = new UserDAO(session);
        List<User> list = userDAO.findAll(0, 0);
        addContent(new _POJOListWrapper(list, session));
    }
}
