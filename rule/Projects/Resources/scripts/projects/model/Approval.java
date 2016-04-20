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
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.exponentus.dataengine.jpa.SecureAppEntity;
import workflow.model.constants.ApprovalStatusType;

@Entity
@Table(name = "approvals")
@NamedQuery(name = "Approval.findAll", query = "SELECT m FROM Approval AS m ORDER BY m.regDate")
public class Approval extends SecureAppEntity {

	@Enumerated(EnumType.STRING)
	@Column(nullable = true, length = 10)
	private ApprovalStatusType status = ApprovalStatusType.UNKNOWN;

	@OneToMany()
	private List<Block> blocks;

}
