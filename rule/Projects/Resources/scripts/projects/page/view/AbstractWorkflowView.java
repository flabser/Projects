package workflow.page.view;

import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;

public abstract class AbstractWorkflowView extends _DoPage {

	@Override
	public abstract void doGET(_Session session, _WebFormData formData);

	@Override
	public abstract void doDELETE(_Session session, _WebFormData formData);

}
