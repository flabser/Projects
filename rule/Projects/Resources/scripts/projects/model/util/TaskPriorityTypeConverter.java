package projects.model.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import projects.model.constants.TaskPriorityType;

@Converter(autoApply = true)
public class TaskPriorityTypeConverter implements AttributeConverter<TaskPriorityType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(TaskPriorityType type) {
		return type.getCode();
	}

	@Override
	public TaskPriorityType convertToEntityAttribute(Integer val) {
		return TaskPriorityType.getType(val);
	}
}
