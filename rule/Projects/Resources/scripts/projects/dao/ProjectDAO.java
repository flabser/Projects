package projects.dao;

import java.util.UUID;

import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import projects.model.Project;

public class ProjectDAO extends DAO<Project, UUID> {

	public ProjectDAO(_Session session) {
		super(Project.class, session);
	}

}
