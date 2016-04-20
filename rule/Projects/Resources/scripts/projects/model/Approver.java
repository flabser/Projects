package workflow.model;

/**
 * 
 * @author Kayra created 07-04-2016
 */

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.exponentus.dataengine.jpa.SecureAppEntity;

import workflow.model.constants.DecisionType;

@Entity
@Table(name = "approvers")
@NamedQuery(name = "Approver.findAll", query = "SELECT m FROM Approver AS m ORDER BY m.regDate")
public class Approver extends SecureAppEntity {

	@Column(name = "approver_user", nullable = false, updatable = false)
	protected Long approverUser;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true, length = 7, unique = true)
	private DecisionType type = DecisionType.UNKNOWN;

	@Column(name = "decision_comment")
	private String decisionComment;

	@NotNull
	@ManyToOne(optional = false)
	private Block block;

	@Column(name = "is_current")
	private boolean isCurrent;

}
