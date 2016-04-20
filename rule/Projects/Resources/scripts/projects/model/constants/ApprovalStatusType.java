package workflow.model.constants;

/**
 * 
 * @author Kayra created 07-04-2016
 */
public enum ApprovalStatusType {
	UNKNOWN(0), DRAFT(80), PROCESSING(81), FINISHED(82);

	private int code;

	ApprovalStatusType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ApprovalStatusType getType(int code) {
		for (ApprovalStatusType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}

}
