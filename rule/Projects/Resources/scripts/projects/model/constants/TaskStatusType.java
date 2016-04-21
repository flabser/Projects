package projects.model.constants;

/**
 * 
 * @author Kayra created 21-04-2016
 */
public enum TaskStatusType {
	UNKNOWN(0), DRAFT(453), WAITING(454), PROCESSED(455), FINISHED(456);

	private int code;

	TaskStatusType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static TaskStatusType getType(int code) {
		for (TaskStatusType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}

}
