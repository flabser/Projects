package projects.page.view;

import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.actions._Action;
import com.exponentus.scripting.actions._ActionBar;
import com.exponentus.scripting.actions._ActionType;

import projects.dao.ProjectDAO;

public class ProjectView extends AbstractProjectsView {

	@Override
	public void doGET(_Session session, _WebFormData formData) {
		_ActionBar actionBar = new _ActionBar(session);
		_Action newDocAction = new _Action(getLocalizedWord("new_", session.getLang()), "", "new_project");
		newDocAction.setURL("Provider?id=project-form");
		actionBar.addAction(newDocAction);
		actionBar.addAction(new _Action(getLocalizedWord("del_document", session.getLang()), "", _ActionType.DELETE_DOCUMENT));
		addContent(actionBar);

		addContent(getViewPage(new ProjectDAO(session), formData));
	}

	@Override
	public void doDELETE(_Session session, _WebFormData formData) {

	}
}
