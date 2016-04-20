package workflow.dao;

import java.util.UUID;

import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;
import workflow.model.Approval;

public class ApprovalDAO extends DAO<Approval, UUID> {

	public ApprovalDAO(_Session session) {
		super(Approval.class, session);
	}

}
