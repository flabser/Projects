package projects.page.view;

import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import projects.dao.ProjectDAO;

public class ProjectView extends AbstractProjectsView {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        addContent(getViewPage(new ProjectDAO(session), formData));
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {

    }
}
