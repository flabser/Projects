package workflow.model;

/**
 * 
 * @author Kayra created 07-04-2016
 */

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.exponentus.dataengine.jpa.SecureAppEntity;

import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.ApprovalType;

@Entity
@Table(name = "blocks")
@NamedQuery(name = "Block.findAll", query = "SELECT m FROM Block AS m ORDER BY m.regDate")
public class Block extends SecureAppEntity {

	@Enumerated(EnumType.STRING)
	@Column(nullable = true, length = 10)
	private ApprovalStatusType status = ApprovalStatusType.UNKNOWN;

	@OneToMany(mappedBy = "block", fetch = FetchType.EAGER)
	private List<Approver> approvers;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true, length = 8, unique = true)
	private ApprovalType type = ApprovalType.UNKNOWN;

	@Column(name = "require_comment_if_no")
	private boolean requireCommentIfNo;

	@Column(name = "time_limit")
	private int timeLimit;

}
