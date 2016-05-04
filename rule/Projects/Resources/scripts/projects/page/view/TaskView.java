package projects.page.view;

import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import projects.dao.TaskDAO;

public class TaskView extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        addContent(getViewPage(new TaskDAO(session), formData));
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {

    }
}
