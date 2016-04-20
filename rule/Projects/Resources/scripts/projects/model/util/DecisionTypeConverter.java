package workflow.model.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import workflow.model.constants.DecisionType;

@Converter(autoApply = true)
public class DecisionTypeConverter implements AttributeConverter<DecisionType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(DecisionType issuePriority) {
		return issuePriority.getCode();
	}

	@Override
	public DecisionType convertToEntityAttribute(Integer priorityValue) {
		return DecisionType.getType(priorityValue);
	}
}
