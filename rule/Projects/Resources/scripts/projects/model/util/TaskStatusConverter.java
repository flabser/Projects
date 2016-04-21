package projects.model.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import projects.model.constants.TaskStatusType;

@Converter(autoApply = true)
public class TaskStatusConverter implements AttributeConverter<TaskStatusType, Integer> {

	@Override
	public Integer convertToDatabaseColumn(TaskStatusType type) {
		return type.getCode();
	}

	@Override
	public TaskStatusType convertToEntityAttribute(Integer val) {
		return TaskStatusType.getType(val);
	}
}
