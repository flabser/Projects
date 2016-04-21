package projects.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;

import projects.model.constants.ProjectStatusType;
import staff.model.Organization;

@Entity
@Table(name = "projects")
@NamedQuery(name = "Project.findAll", query = "SELECT m FROM Project AS m ORDER BY m.regDate")
public class Project extends SecureAppEntity {

	private String name;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true, length = 10)
	private ProjectStatusType status = ProjectStatusType.UNKNOWN;

	private Organization customer;

	private String customerRepresentative;

	private long manager;

	private long programmer;

	private long tester;

	private List<Long> observers;

	private Date finishDate;

	private String comment;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "project_attachments", joinColumns = { @JoinColumn(name = "parent_id", referencedColumnName = "id") }, inverseJoinColumns = {
	        @JoinColumn(name = "attachment_id", referencedColumnName = "id") })
	private List<Attachment> attachments;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ProjectStatusType getStatus() {
		return status;
	}

	public void setStatus(ProjectStatusType status) {
		this.status = status;
	}

	public Organization getCustomer() {
		return customer;
	}

	public void setCustomer(Organization customer) {
		this.customer = customer;
	}

	public String getCustomerRepresentative() {
		return customerRepresentative;
	}

	public void setCustomerRepresentative(String customerRepresentative) {
		this.customerRepresentative = customerRepresentative;
	}

	public long getManager() {
		return manager;
	}

	public void setManager(long manager) {
		this.manager = manager;
	}

	public long getProgrammer() {
		return programmer;
	}

	public void setProgrammer(long programmer) {
		this.programmer = programmer;
	}

	public long getTester() {
		return tester;
	}

	public void setTester(long tester) {
		this.tester = tester;
	}

	public List<Long> getObservers() {
		return observers;
	}

	public void setObservers(List<Long> observers) {
		this.observers = observers;
	}

	public Date getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public List<Attachment> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}

}
