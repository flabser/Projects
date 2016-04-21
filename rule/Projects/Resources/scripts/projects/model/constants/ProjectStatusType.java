package projects.model.constants;

/**
 * 
 * @author Kayra created 21-04-2016
 */
public enum ProjectStatusType {
	UNKNOWN(0), DRAFT(899), PROCESSED(900), FINISHED(901);

	private int code;

	ProjectStatusType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ProjectStatusType getType(int code) {
		for (ProjectStatusType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}

}
