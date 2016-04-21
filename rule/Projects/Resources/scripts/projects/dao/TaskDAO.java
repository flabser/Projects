package projects.dao;

import java.util.UUID;

import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import projects.model.Task;

public class TaskDAO extends DAO<Task, UUID> {

	public TaskDAO(_Session session) {
		super(Task.class, session);
	}

}
