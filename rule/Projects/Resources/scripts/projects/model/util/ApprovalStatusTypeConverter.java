package workflow.model.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import workflow.model.constants.ApprovalStatusType;

@Converter(autoApply = true)
public class ApprovalStatusTypeConverter implements AttributeConverter<ApprovalStatusType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(ApprovalStatusType issuePriority) {
		return issuePriority.getCode();
	}

	@Override
	public ApprovalStatusType convertToEntityAttribute(Integer priorityValue) {
		return ApprovalStatusType.getType(priorityValue);
	}
}
